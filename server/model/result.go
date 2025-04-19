package model

type URLRequest struct {
	URLs []string `json:"urls"`
}

type URLResult struct {
	URL        string `json:"url"`
	StatusCode int    `json:"statusCode"`
	StatusText string `json:"statusText"`
	ResponseMS int64  `json:"responseMS"`
	Error      string `json:"error,omitempty"`
}
