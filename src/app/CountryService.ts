import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable, Subject } from "rxjs";
import { Article } from "./models";

const COUNTRY_URL = "https://restcountries.com/v3.1/alpha"

//https://restcountries.com/v3.1/alpha?codes=us,sg,jp

@Injectable()
export class CountryService {

    onCountries = new Subject<string[]>

    constructor(private http: HttpClient) { }


    getCountriesObs(countryCodes: string[]): Observable<any[]> {
        const params = new HttpParams()
            .set('codes', countryCodes.toString())

        return this.http.get<any[]>(COUNTRY_URL, { params })
            .pipe()
    }

    getCountries(countryCodes: string[]): Promise<string[] | void> {
        return firstValueFrom(
            this.getCountriesObs(countryCodes)
        )
            .then((response: any) => {
                let countryList = []
                const n = response[0]['name']['common'] as string
                countryList.push(n)
                return countryList
            })
            .then((sources) => {
                // broadcast the articles
                this.onCountries.next(sources)
                console.debug("Countries >>> ", sources)
                return sources
            })
            .catch((error) => {
                alert("Error >>> " + error)
            })
    }
}