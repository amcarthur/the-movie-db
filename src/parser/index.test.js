import parseData, {
  formatDateIfApplicable,
  camelCaseIfApplicable,
  setDataAccordingToValueType,
} from './';
import popularMoviesMockResponse from './movies-popular.json';

describe('parser', () => {
  it('must parse correctly a mocked response', () => {
    const parsedResponse = parseData(popularMoviesMockResponse);
    const parsedResponseData = parsedResponse;

    expect(typeof parsedResponseData.page === 'number').toBeTruthy();
    expect(typeof parsedResponseData.totalPages === 'number').toBeTruthy();
    expect(typeof parsedResponseData.totalResults === 'number').toBeTruthy();

    expect(Array.isArray(parsedResponseData.results)).toBeTruthy();
    const firstResult = parsedResponseData.results[0];

    expect(typeof firstResult.voteCount === 'number').toBeTruthy();
    expect(typeof firstResult.id === 'number').toBeTruthy();
    expect(typeof firstResult.video === 'boolean').toBeTruthy();
    expect(typeof firstResult.voteAverage === 'number').toBeTruthy();
    expect(typeof firstResult.title === 'string').toBeTruthy();
    expect(typeof firstResult.popularity === 'number').toBeTruthy();
    expect(typeof firstResult.posterPath === 'string').toBeTruthy();
    expect(typeof firstResult.originalLanguage === 'string').toBeTruthy();
    expect(typeof firstResult.originalTitle === 'string').toBeTruthy();
    expect(Array.isArray(firstResult.genreIds)).toBeTruthy();
    expect(
      firstResult.genreIds.every(genreId => typeof genreId === 'number')
    ).toBeTruthy();
    expect(typeof firstResult.backdropPath === 'string').toBeTruthy();
    expect(typeof firstResult.adult === 'boolean').toBeTruthy();
    expect(typeof firstResult.overview === 'string').toBeTruthy();
    expect(firstResult.releaseDate instanceof Date).toBeTruthy();
  });

  it('must format date when applicable', () => {
    const date = new Date('2018-10-03');

    expect(formatDateIfApplicable(date, 'release_date')).toBeInstanceOf(Date);
    expect(formatDateIfApplicable(date, 'expires_at')).toBeInstanceOf(Date);
  });

  it('must not format wrong date passed', () => {
    const badStringDate = 'foo-bar';

    expect(formatDateIfApplicable(badStringDate, 'release_date')).toEqual(
      badStringDate
    );
    expect(formatDateIfApplicable(badStringDate, 'expires_at')).toEqual(
      badStringDate
    );
  });

  it('must apply camelcase if applicable', () => {
    expect(camelCaseIfApplicable('release_date')).toEqual('releaseDate');
    expect(camelCaseIfApplicable('iso_3166_1')).toEqual('iso-3166-1');
  });

  it('must set the same data type that it was passed in key', () => {
    const stringData = { name: 'Community' };
    const arrayData = { ids: [1, 2] };
    const objectData = { metadata: { producer: 'Abed Nadir' } };

    expect(typeof setDataAccordingToValueType(stringData, 'name')).toEqual(
      typeof stringData['name']
    );
    expect(
      Array.isArray(setDataAccordingToValueType(arrayData, 'ids'))
    ).toBeTruthy();
    expect(setDataAccordingToValueType(objectData, 'metadata')).toBeInstanceOf(
      Object
    );
  });

  it('must parse data correcty', () => {
    const emptyData = [];
    const dataWithKey = { writer_producer: 'Dan Harmon' };

    expect(parseData(emptyData)).toEqual([]);
    expect(parseData(dataWithKey)).toEqual({ writerProducer: 'Dan Harmon' });
  });
});
