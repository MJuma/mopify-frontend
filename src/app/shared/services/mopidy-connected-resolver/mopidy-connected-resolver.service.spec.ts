import { TestBed } from '@angular/core/testing';

import { MopidyConnectedResolverService } from './mopidy-connected-resolver.service';

describe('MopidyConnectedResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MopidyConnectedResolverService = TestBed.get(MopidyConnectedResolverService);
    expect(service).toBeTruthy();
  });
});
