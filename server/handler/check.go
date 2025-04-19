package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"

	"pingVerge/model"
)

func CheckURLs(w http.ResponseWriter, r *http.Request) {
	var req model.URLRequest
	json.NewDecoder(r.Body).Decode(&req)

	var wg sync.WaitGroup
	results := make(chan model.URLResult, len(req.URLs))

	for _, rawURL := range req.URLs {
		url := normalizeURL(rawURL)

		wg.Add(1)
		go func(url string) {
			defer wg.Done()
			start := time.Now()

			client := &http.Client{
				Timeout: 5 * time.Second,
			}

			resp, err := client.Get(url)
			if err != nil {
				results <- model.URLResult{
					URL:   url,
					Error: err.Error(),
				}
				return
			}
			defer resp.Body.Close()

			duration := time.Since(start).Milliseconds()

			results <- model.URLResult{
				URL:        url,
				StatusCode: resp.StatusCode,
				StatusText: resp.Status,
				ResponseMS: duration,
			}
		}(url)
	}

	wg.Wait()
	close(results)

	var res []model.URLResult
	for r := range results {
		fmt.Printf("Result: %+v\n", r) // <- Moved here
		res = append(res, r)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func normalizeURL(url string) string {
	if !strings.HasPrefix(url, "http") {
		return "https://" + url
	}
	return url
}
