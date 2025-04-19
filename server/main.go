package main

import (
	"log"
	"net/http"

	"pingVerge/handler"
	"pingVerge/middleware"
)

func main() {
	http.HandleFunc("/check", middleware.WithCORS(handler.CheckURLs))

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
