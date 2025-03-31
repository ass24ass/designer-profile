import { Database } from '@/types/supabase'
import { BaseService } from './base.service'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export class ProfileService extends BaseService {
  private static instance: ProfileService

  private constructor() {
    super()
  }

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }

  async getProfile(userId: string): Promise<Profile | null> {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  async updateProfile(userId: string, profile: ProfileUpdate): Promise<Profile> {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .update(profile)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      this.handleError(error)
    }
  }

  async createProfile(profile: ProfileInsert): Promise<Profile> {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      this.handleError(error)
    }
  }
} 