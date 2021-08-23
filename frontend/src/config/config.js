const dev = {
   url: {
    baseBackendURL: 'http://localhost:8080',
    baseAPIURL: 'http://localhost:8080/api/v2',
  }
};

const prod = {
   url: {
     baseBackendURL: '',
     baseAPIURL: '',
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;