import {TestBed} from '@angular/core/testing';

import {OpenAiBackendService} from './open-ai-backend.service';

describe('OpenAiBackendService', () => {
  let service: OpenAiBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAiBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
