import { useQuery } from '@tanstack/react-query';
import type { User } from '../types';
import { fetchUsers } from './usersApi';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};