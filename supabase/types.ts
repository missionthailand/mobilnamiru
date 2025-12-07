export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      audit_submissions: {
        Row: {
          account_breach_suspicion: string | null;
          addictive_content_types: string[] | null;
          always_available: string | null;
          android_backup_method: string | null;
          android_digital_wellbeing: string | null;
          app_count: string | null;
          backup_status: string | null;
          barrier_preference: string | null;
          biggest_stress: string | null;
          calendar_tools: string[] | null;
          change_radicality: string | null;
          communication_channels: string[] | null;
          created_at: string;
          critical_accounts: string | null;
          daily_messages: string | null;
          desired_change: string | null;
          device_model: string | null;
          email: string;
          generated_report: string | null;
          homescreen_state: string | null;
          id: string;
          ios_focus_modes: string | null;
          ios_icloud_sync: string[] | null;
          main_goal: string | null;
          marketing_consent: boolean;
          name: string | null;
          notes_location: string | null;
          notification_impact: string | null;
          other_devices: string[] | null;
          password_manager: string | null;
          peak_usage_time: string | null;
          phone_anxiety: string | null;
          phone_check_frequency: string | null;
          primary_accounts: string[] | null;
          privacy_preference: string | null;
          regime_changes_consent: string | null;
          report_generated_at: string | null;
          response_blockers: string[] | null;
          response_time_requirement: string | null;
          scrolling_triggers: string[] | null;
          security_features: string[] | null;
          spiral_breakers: string[] | null;
          system_type: string;
          time_to_save: string | null;
          time_wasting_apps: string | null;
          top_usage: string[] | null;
          two_factor_auth: string[] | null;
          work_personal_separation: string | null;
          work_regime: string | null;
        };
        Insert: {
          account_breach_suspicion?: string | null;
          addictive_content_types?: string[] | null;
          always_available?: string | null;
          android_backup_method?: string | null;
          android_digital_wellbeing?: string | null;
          app_count?: string | null;
          backup_status?: string | null;
          barrier_preference?: string | null;
          biggest_stress?: string | null;
          calendar_tools?: string[] | null;
          change_radicality?: string | null;
          communication_channels?: string[] | null;
          created_at?: string;
          critical_accounts?: string | null;
          daily_messages?: string | null;
          desired_change?: string | null;
          device_model?: string | null;
          email: string;
          generated_report?: string | null;
          homescreen_state?: string | null;
          id?: string;
          ios_focus_modes?: string | null;
          ios_icloud_sync?: string[] | null;
          main_goal?: string | null;
          marketing_consent?: boolean;
          name?: string | null;
          notes_location?: string | null;
          notification_impact?: string | null;
          other_devices?: string[] | null;
          password_manager?: string | null;
          peak_usage_time?: string | null;
          phone_anxiety?: string | null;
          phone_check_frequency?: string | null;
          primary_accounts?: string[] | null;
          privacy_preference?: string | null;
          regime_changes_consent?: string | null;
          report_generated_at?: string | null;
          response_blockers?: string[] | null;
          response_time_requirement?: string | null;
          scrolling_triggers?: string[] | null;
          security_features?: string[] | null;
          spiral_breakers?: string[] | null;
          system_type: string;
          time_to_save?: string | null;
          time_wasting_apps?: string | null;
          top_usage?: string[] | null;
          two_factor_auth?: string[] | null;
          work_personal_separation?: string | null;
          work_regime?: string | null;
        };
        Update: {
          account_breach_suspicion?: string | null;
          addictive_content_types?: string[] | null;
          always_available?: string | null;
          android_backup_method?: string | null;
          android_digital_wellbeing?: string | null;
          app_count?: string | null;
          backup_status?: string | null;
          barrier_preference?: string | null;
          biggest_stress?: string | null;
          calendar_tools?: string[] | null;
          change_radicality?: string | null;
          communication_channels?: string[] | null;
          created_at?: string;
          critical_accounts?: string | null;
          daily_messages?: string | null;
          desired_change?: string | null;
          device_model?: string | null;
          email?: string;
          generated_report?: string | null;
          homescreen_state?: string | null;
          id?: string;
          ios_focus_modes?: string | null;
          ios_icloud_sync?: string[] | null;
          main_goal?: string | null;
          marketing_consent?: boolean;
          name?: string | null;
          notes_location?: string | null;
          notification_impact?: string | null;
          other_devices?: string[] | null;
          password_manager?: string | null;
          peak_usage_time?: string | null;
          phone_anxiety?: string | null;
          phone_check_frequency?: string | null;
          primary_accounts?: string[] | null;
          privacy_preference?: string | null;
          regime_changes_consent?: string | null;
          report_generated_at?: string | null;
          response_blockers?: string[] | null;
          response_time_requirement?: string | null;
          scrolling_triggers?: string[] | null;
          security_features?: string[] | null;
          spiral_breakers?: string[] | null;
          system_type?: string;
          time_to_save?: string | null;
          time_wasting_apps?: string | null;
          top_usage?: string[] | null;
          two_factor_auth?: string[] | null;
          work_personal_separation?: string | null;
          work_regime?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
