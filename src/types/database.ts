export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          name: string;
          description: string;
          image: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          image: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          image?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          description: string;
          image: string;
          collection_id: string;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          description: string;
          image: string;
          collection_id: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          description?: string;
          image?: string;
          collection_id?: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      build_triggers: {
        Row: {
          id: string;
          trigger_type: string;
          table_name: string;
          record_id: string | null;
          action: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          trigger_type: string;
          table_name: string;
          record_id?: string | null;
          action: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          trigger_type?: string;
          table_name?: string;
          record_id?: string | null;
          action?: string;
          created_at?: string;
        };
      };
    };
  };
}