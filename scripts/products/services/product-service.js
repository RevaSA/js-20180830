import HttpService from '../../http-service.js'

const ProductService = {
  getPhones() {
    return HttpService.sendRequest('phones.json');
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`phones/${phoneId}.json`);
  },
};

export default ProductService;
