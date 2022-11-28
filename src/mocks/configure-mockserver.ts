import { mockServerClient } from 'mockserver-client';

const getUserByIdMock = {
  httpRequest: {
    path: '/users/internal/{id}',
    pathParameters: {
      id: ['[A-Za-z0-9\\-]+'],
    },
  },
  httpResponse: {
    body: {
      id: '7aebe2db-8153-4ae4-9919-7cdcd324ff80',
      username: 'random username',
      avatar: 'https://image.com',
    },
  },
};

const getServerByIdMock = {
  httpRequest: {
    path: '/servers/internal/{id}',
    pathParameters: {
      id: ['[A-Za-z0-9\\-]+'],
    },
  },
  httpResponse: {
    body: {
      _id: '638490b78056b2345589fe45',
      name: 'random server name',
      icon: 'https://image.com/test.png',
    },
  },
};

export const configureMockserver = async () => {
  await mockServerClient('mockserver', 1080).mockAnyResponse(getUserByIdMock);
  await mockServerClient('mockserver', 1080).mockAnyResponse(getServerByIdMock);
};
