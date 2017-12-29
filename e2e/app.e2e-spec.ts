import { RestaurantFrontendPage } from './app.po';

describe('restaurant-frontend App', function() {
  let page: RestaurantFrontendPage;

  beforeEach(() => {
    page = new RestaurantFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
