import { assign, isEmpty } from 'lodash';
import qs from 'qs';
import axios from 'axios';

import site from '@/config/site';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

// Event ==================================================================
export const getAllEvent = async ({ params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${coreUrl}/v1/event?${merge}`,
  };
  const { data } = await axios(options);

  const result: any = {
    data: data.data,
  };

  if (isEmpty(data.data)) {
    assign(result, {
      pagination: { empty: true },
      hasMore: false,
    });
  } else {
    assign(result, {
      pagination: data.pagination,
      hasMore: data.pagination.next_page < data.pagination.total_pages,
    });
  }

  return result;
};

export const getEvent = async ({ id, params = {} }) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/event/${id}?${merge}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

// Theme ==================================================================
export const getAllTheme = async ({ params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${coreUrl}/v1/theme?${merge}`,
  };
  const { data } = await axios(options);

  const result: any = {
    data: data.data,
  };

  if (isEmpty(data.data)) {
    assign(result, {
      pagination: { empty: true },
      hasMore: false,
    });
  } else {
    assign(result, {
      pagination: data.pagination,
      hasMore: data.pagination.next_page < data.pagination.total_pages,
    });
  }

  return result;
};

// Invitation ==================================================================
export const getAllInvitation = async (accessToken, { params = {} }) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation?${merge}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const getInvitation = async (accessToken, { id, params = {} }) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation/${id}?${merge}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

// Guest Book ==================================================================
export const getAllGuestbook = async (accessToken, { params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    url: `${coreUrl}/v1/invitation-guest-book?${merge}`,
  };
  const { data } = await axios(options);

  const result: any = {
    data: data.data,
  };

  if (isEmpty(data.data)) {
    assign(result, {
      pagination: { empty: true },
      hasMore: false,
    });
  } else {
    assign(result, {
      pagination: data.pagination,
      hasMore: data.pagination.next_page < data.pagination.total_pages,
    });
  }

  return result;
};

export const getTotalGuestbook = async (accessToken, { params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    url: `${coreUrl}/v1/invitation-guest-book/total?${merge}`,
  };
  const { data } = await axios(options);

  const result: any = {};

  if (isEmpty(data.data)) {
    assign(result, {
      data: 0,
    });
  } else {
    assign(result, {
      data: data.data.count,
    });
  }

  return result;
};

export const getGuestbook = async (accessToken, { id, params = {} }) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book/${id}?${merge}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const createGuestbook = async (accessToken, { body, params = {} }) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book?${merge}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const updateGuestbook = async (
  accessToken,
  { id, body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book/${id}?${merge}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

// Greeting ====================================================================
export const getAllGreeting = async (accessToken, { params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    url: `${coreUrl}/v1/invitation-greeting?${merge}`,
  };
  const { data } = await axios(options);

  const result: any = {
    data: data.data,
  };

  if (isEmpty(data.data)) {
    assign(result, {
      pagination: { empty: true },
      hasMore: false,
    });
  } else {
    assign(result, {
      pagination: data.pagination,
      hasMore: data.pagination.next_page < data.pagination.total_pages,
    });
  }

  return result;
};

export const getTotalGreeting = async (accessToken, { params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    url: `${coreUrl}/v1/invitation-greeting/total?${merge}`,
  };
  const { data } = await axios(options);

  const result: any = {};

  if (isEmpty(data.data)) {
    assign(result, {
      data: 0,
    });
  } else {
    assign(result, {
      data: data.data.count,
    });
  }

  return result;
};

// Invitation Guest Book Template ==============================================
export const getGuestbookTemplate = async (
  accessToken,
  { id, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(
    `${coreUrl}/v1/invitation-guest-book-template/${id}?${merge}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((res) => res.data);
};

export const updateGuestbookTemplate = async (
  accessToken,
  { id, body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(
    `${coreUrl}/v1/invitation-guest-book-template/${id}?${merge}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
    .then((res) => res.json())
    .then((res) => res.data);
};

// Appearance ==================================================================
export const getAllAppearance = async (accessToken, { params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    url: `${coreUrl}/v1/appearance?${merge}`,
  };
  const { data } = await axios(options);
  return { data: data.data };
};

export const updateAppearanceFeature = async (
  accessToken,
  { id, body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-feature/${id}?${merge}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const updateAppearanceFeatureData = async (
  accessToken,
  { id, body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-feature-data/${id}?${merge}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

// Gift ====================================================================
export const getAllGift = async ({ params = {} }: any) => {
  const merge = qs.stringify(params);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${site.siteUrl}/api/gift?${merge}`,
  };
  const { data } = await axios(options);

  const result: any = {
    data: data.data,
  };

  return result;
};
