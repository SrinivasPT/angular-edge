import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DomainData } from '../models';

@Injectable({
    providedIn: 'root',
})
export class DomainDataService {
    // Mock data for demonstration purposes. Replace this with an API call or actual data source.
    private domainData: { [key: string]: DomainData[] } = {
        LOAN_TYPE: [
            { code: 'LT1', displayText: 'Personal Loan' },
            { code: 'LT2', displayText: 'Home Loan' },
            { code: 'LT3', displayText: 'Auto Loan' },
        ],
        CITY_CODE: [
            { code: 'NY', displayText: 'New York' },
            { code: 'LA', displayText: 'Los Angeles' },
            { code: 'CH', displayText: 'Chicago' },
        ],
        GENDER: [
            { code: 'MALE', displayText: 'Male' },
            { code: 'FEMALE', displayText: 'FEMALE' },
            { code: 'OTHER', displayText: 'Other' },
        ],
    };

    getDomain(categoryCode: string): Observable<DomainData[]> {
        return of(this.domainData[categoryCode] || []);
    }
}
