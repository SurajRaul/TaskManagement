import { TestBed } from '@angular/core/testing';

import { TaskAuthService } from './task-auth.service';

describe('TaskAuthService', () => {
  let service: TaskAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
