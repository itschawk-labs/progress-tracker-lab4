import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne('http://localhost:8000/milestones').flush([]);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the Project Progress Tracker heading', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne('http://localhost:8000/milestones').flush([]);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Project Progress Tracker');
  });

  it('should display the milestones returned by the GET request', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne('http://localhost:8000/milestones').flush([
      { id: 1, name: 'Project Planning', status: 'Completed' },
      { id: 2, name: 'Angular Development', status: 'In Progress' },
      { id: 3, name: 'Backend Integration', status: 'Not Started' },
    ]);
    await fixture.whenStable();
    fixture.detectChanges();
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('.milestone');
    expect(items.length).toBe(3);
  });
});
