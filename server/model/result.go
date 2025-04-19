package model

type URLRequest struct {
	URLs []string `json:"urls"`
}

type URLResult struct {
	URL         string `json:"url"`
	StatusCode  int    `json:"status_code"`
	StatusText  string `json:"status_text"`
	ResponseMS  int64  `json:"response_ms"`
	Error       string `json:"error,omitempty"`
}
