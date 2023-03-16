import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchTerms } from '../models';
import { NewsService } from '../NewsService';
import { CountryService } from '../CountryService';
import { Subscription } from 'rxjs';

const COUNTRIES: string[] = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]
const CATEGORIES: string[] = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

@Component({
  selector: 'app-get-news',
  templateUrl: './get-news.component.html',
  styleUrls: ['./get-news.component.css']
})
export class GetNewsComponent {

  countries: string[] = COUNTRIES
  categories: string[] = CATEGORIES
  countrySub!: Subscription
  countryString: string[] = []

  getNewsForm!: FormGroup

  constructor(private fb: FormBuilder,
    private newsSvc: NewsService,
    private countrySvc: CountryService) { }

  ngOnInit(): void {
    console.log(this.countries.toString())
    // create form
    this.getNewsForm = this.fb.group({
      country: this.fb.control<string>(''),
      category: this.fb.control<string>(''),
    })
    // sub to country service
    this.countrySub = this.countrySvc.onCountries.subscribe(
      // receive broadcasts from service
      (countries) => { this.countryString = countries }
    )
  }

  searchNews() {
    const searchTerm: SearchTerms = this.getNewsForm.value as SearchTerms
    console.debug("Searching for >>> ", searchTerm)
    // trigger news service
    this.newsSvc.getNews(searchTerm)
  }

  getCountries() {
    // trigger country service
    this.countrySvc.getCountries(COUNTRIES)
    // print out country broadcast
    console.debug("COUNTRIES >>> " + this.countryString)
  }
}
