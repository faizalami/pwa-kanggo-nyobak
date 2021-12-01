import favoritesServiceFactory from '../factory/favoritesServiceFactory';

export default (favoritesService) => {
  afterEach(async () => {
    const remainingItems = await favoritesService.getAll();
    await Promise.all(remainingItems.map(item => {
      return favoritesService.delete(item.id);
    }));
  });

  it('should have required properties/functions', () => {
    expect(Object.keys(favoritesService)).toEqual([
      'storeName',
      'getAll',
      'detail',
      'save',
      'delete',
    ]);
  });

  it('should return the restaurant that has been saved', async () => {
    await favoritesServiceFactory(favoritesService, [
      { id: 1 },
      { id: 2 },
    ]);

    expect(await favoritesService.detail(1))
      .toEqual({ id: 1 });

    expect(await favoritesService.detail(2))
      .toEqual({ id: 2 });

    expect(await favoritesService.detail(3))
      .toEqual(undefined);
  });

  it('should not add object without id property', async () => {
    await favoritesService.save({ aProperty: 'property' });

    expect(await favoritesService.getAll())
      .toEqual([]);
  });

  it('can return all of the restaurant that have been added', async () => {
    const restaurants = [
      { id: 1 },
      { id: 2 },
    ];
    await favoritesServiceFactory(favoritesService, restaurants);

    expect(await favoritesService.getAll()).toEqual(restaurants);
  });

  it('should be able to remove from favorite', async () => {
    await favoritesServiceFactory(favoritesService, [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);

    await favoritesService.delete(1);

    expect(await favoritesService.getAll())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should not error event the id to be delete is not exist', async () => {
    const restaurants = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];
    await favoritesServiceFactory(favoritesService, restaurants);

    await favoritesService.delete(4);

    expect(await favoritesService.getAll()).toEqual(restaurants);
  });
};
