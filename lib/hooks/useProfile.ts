import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '@/lib/supabase/services/profile.service'
import { Database } from '@/types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

const profileService = ProfileService.getInstance()

export function useProfile(userId: string | undefined) {
  const queryClient = useQueryClient()

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => (userId ? profileService.getProfile(userId) : null),
    enabled: !!userId,
  })

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: ProfileUpdate) =>
      profileService.updateProfile(userId!, data),
    onSuccess: (newProfile) => {
      queryClient.setQueryData(['profile', userId], newProfile)
    },
  })

  const { mutate: createProfile } = useMutation({
    mutationFn: (data: ProfileInsert) => profileService.createProfile(data),
    onSuccess: (newProfile) => {
      queryClient.setQueryData(['profile', userId], newProfile)
    },
  })

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    createProfile,
  }
} 