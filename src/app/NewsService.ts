import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable, Subject } from "rxjs";
import { Article, SearchTerms } from "./models";

const NEWS_URL = "https://newsapi.org/v2/top-headlines/sources"
const APIKEY = ""

@Injectable()
export class NewsService {

    onNews = new Subject<Article[]>

    constructor(private http: HttpClient) { }

    getNewsObs(s: SearchTerms): Observable<Article[]> {
        const params = new HttpParams()
            .set('country', s.country)
            .set('category', s.category)
            .set('apiKey', APIKEY)

        return this.http.get<Article[]>(NEWS_URL, { params })
            .pipe()
    }

    getNews(s: SearchTerms): Promise<Article[] | void> {
        return firstValueFrom(
            this.getNewsObs(s)
        )
            .then((response: any) => {
                const n = response['sources'] as Article[]
                return n
            })
            .then((sources) => {
                // broadcast the articles
                this.onNews.next(sources)
                return sources
            })
            .catch((error) => {
                alert("Error >>> " + error)
            })
    }
}