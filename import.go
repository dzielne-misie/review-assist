// import.go
package main

import (
	"bufio"
	"encoding/xml"
	"fmt"
	"github.com/dzielne-misie/ral/parsers"
	"os"
	"sync"
)

func main() {
	ch := make(chan *parsers.Violation, 100)
	wg := new(sync.WaitGroup)
	fCh := make(chan *parsers.File)
	prs := []parsers.Parser{parsers.NewCpd(fCh), parsers.NewPmd(fCh)}
	for _, pr := range prs {
		pr.SetChannel(ch)
		pr.SetWaitGroup(wg)
	}
	fCpd, _ := os.Open("/home/iwan/projects/projecttracking/build/logs/pmd-cpd.xml")
	fPmd, _ := os.Open("/home/iwan/projects/projecttracking/build/logs/pmd.xml")
	readers := []parsers.Decoder{xml.NewDecoder(bufio.NewReader(fCpd)), xml.NewDecoder(bufio.NewReader(fPmd))}

	for i, pr := range prs {
		wg.Add(1)
		go pr.Parse(readers[i])
	}
	go func() {
		for {
			select {
			case v := <-ch:
				fmt.Println(v.Type)
			}
		}
	}()
	wg.Wait()
}
