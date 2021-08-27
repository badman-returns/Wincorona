const dev = {
   url: {
    baseBackendURL: 'http://localhost:8080',
    baseAPIURL: 'http://localhost:8080/api/v2',
  }
};

const prod = {
   url: {
     baseBackendURL: 'https://winc-backend.herokuapp.com',
     baseAPIURL: 'https://winc-backend.herokuapp.com',
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;