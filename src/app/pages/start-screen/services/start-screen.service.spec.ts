import {TestBed} from '@angular/core/testing';

import {StartScreenService} from './start-screen.service';

describe('StartScreenService', () => {
  let service: StartScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
