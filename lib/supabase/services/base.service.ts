import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../client'

export class BaseService {
  protected supabase: SupabaseClient

  constructor() {
    this.supabase = supabase
  }

  protected handleError(error: any): never {
    console.error('Supabase Error:', error)
    throw new Error(error.message || 'An unexpected error occurred')
  }
} 