import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SectionConfig, PageConfig } from '../models';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private pageConfig: PageConfig | null = null;
    private readonly configUrl = 'http://localhost:3001/page-config/detail'; // API endpoint for page configuration
    private readonly dataUrl = 'http://localhost:3001/data/detail';

    constructor(private http: HttpClient) {}

    // Method to load the configuration from the API
    loadConfig(): Observable<PageConfig | null> {
        return this.http.get<PageConfig>(this.configUrl).pipe(
            tap((config) => (this.pageConfig = config)), // Store the loaded config
            catchError((error) => {
                console.error('Error loading configuration:', error);
                return of(null);
            })
        );
    }

    // loadConfig(): Promise<PageConfig> {
    //     return import('../../demo/demo-page-config.json'); //.then((data: any) => (this.pageConfig = data));
    // }

    // Method to get the full page configuration from the stored config
    getPageConfig(): PageConfig | null {
        return this.pageConfig;
    }

    getFormSections(): SectionConfig[] {
        if (!this.pageConfig) return [];
        return this.pageConfig?.sectionRepository.filter((section) => this.pageConfig?.sections.includes(section.key)) as SectionConfig[];
    }

    // Method to get a specific section configuration by sectionId from the stored config
    getSectionConfig(sectionKey: string): SectionConfig | null {
        if (!this.pageConfig) {
            console.error('Configuration not loaded yet.');
            return null;
        }

        const section = this.pageConfig.sectionRepository.find((section: SectionConfig) => section.key === sectionKey);

        if (!section) {
            console.warn(`Section with Key '${sectionKey}' not found.`);
        }

        return section || null;
    }

    getData(): any {
        return this.http.get<PageConfig>(this.dataUrl).pipe(
            // tap((config) => (this.pageConfig = config)), // Store the loaded config
            catchError((error) => {
                console.error('Error loading configuration:', error);
                return of(null);
            })
        );
    }
}
