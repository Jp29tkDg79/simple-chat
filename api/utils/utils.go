package utils

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
)


func ReqBodyEncordJson(req *http.Request) (map[string]string, error) {
	b := req.Body
	defer b.Close()
	buf := new(bytes.Buffer)
	io.Copy(buf, b)
	var body map[string]string
	err := json.Unmarshal(buf.Bytes(), &body)
	return body, err
}

func Validation(d map[string]string, keys...string) bool {
	rs := true
	for _, v := range keys {
		if _, ok := d[v]; !ok {
			rs = false
		}
	}
	return rs
}

