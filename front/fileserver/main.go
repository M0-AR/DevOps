package main

import (
	"net/http"
	"regexp"
)

func main() {
	fileServer := http.FileServer(http.Dir("./"))
	fileMatcher := regexp.MustCompile(`\.[a-zA-Z]*$`)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if !fileMatcher.MatchString(r.URL.Path) {
			http.ServeFile(w, r, "./index.html")
		} else {
			fileServer.ServeHTTP(w, r)
		}
	})
	http.ListenAndServe(":3000", nil)
}
