import qs from 'qs';
import { User } from '@/pages/api/user';

const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;

// Invitation ==================================================================
export const getAllInvitation = async (
  user: User | undefined,
  { params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation?${merge}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const getInvitation = async (
  user: User | undefined,
  { id, params = {} },
) => {
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
export const getAllGuestbook = async (
  user: User | undefined,
  { params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book?${merge}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const getGuestbook = async (
  user: User | undefined,
  { id, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book/${id}?${merge}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const createGuestbook = async (
  user: User | undefined,
  { body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book?${merge}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

export const updateGuestbook = async (
  user: User | undefined,
  { id, body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-guest-book/${id}?${merge}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

// Greeting ====================================================================
export const getAllGreeting = async (
  user: User | undefined,
  { params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(`${coreUrl}/v1/invitation-greeting?${merge}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

// Invitation Guest Book Template ==============================================
export const getGuestbookTemplate = async (
  user: User | undefined,
  { id, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(
    `${coreUrl}/v1/invitation-guest-book-template/${id}?${merge}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((res) => res.data);
};

export const updateGuestbookTemplate = async (
  user: User | undefined,
  { id, body, params = {} },
) => {
  const merge = qs.stringify(params);
  return await fetch(
    `${coreUrl}/v1/invitation-guest-book-template/${id}?${merge}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
    .then((res) => res.json())
    .then((res) => res.data);
};
