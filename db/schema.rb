# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_04_130954) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "addressable_type"
    t.bigint "addressable_id"
    t.string "address_type", default: "current"
    t.string "address_line_1", null: false
    t.string "address_line_2"
    t.string "city", null: false
    t.string "country", null: false
    t.string "pin", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "state", null: false
    t.index ["addressable_type", "addressable_id", "address_type"], name: "index_addresses_on_addressable_and_address_type", unique: true
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "candidates", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.bigint "consultancy_id"
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.text "emails", default: [], array: true
    t.text "address"
    t.string "country"
    t.string "mobilephone"
    t.string "telephone"
    t.string "skypeid"
    t.string "linkedinid"
    t.string "description"
    t.text "cover_letter"
    t.integer "status_code"
    t.integer "preferred_contact_method_code"
    t.integer "initial_communication"
    t.text "tech_stack_ids", default: [], array: true
    t.integer "source_code"
    t.bigint "assignee_id"
    t.bigint "reporter_id"
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.bigint "company_id"
    t.index ["assignee_id"], name: "index_candidates_on_assignee_id"
    t.index ["company_id"], name: "index_candidates_on_company_id"
    t.index ["consultancy_id"], name: "index_candidates_on_consultancy_id"
    t.index ["created_by_id"], name: "index_candidates_on_created_by_id"
    t.index ["discarded_at"], name: "index_candidates_on_discarded_at"
    t.index ["reporter_id"], name: "index_candidates_on_reporter_id"
    t.index ["updated_by_id"], name: "index_candidates_on_updated_by_id"
  end

  create_table "clients", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "name", null: false
    t.string "email"
    t.string "phone"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.string "stripe_id"
    t.index ["company_id"], name: "index_clients_on_company_id"
    t.index ["discarded_at"], name: "index_clients_on_discarded_at"
    t.index ["email", "company_id"], name: "index_clients_on_email_and_company_id", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.text "address", null: false
    t.string "business_phone"
    t.string "base_currency", default: "USD", null: false
    t.decimal "standard_price", default: "0.0", null: false
    t.string "fiscal_year_end"
    t.string "date_format"
    t.string "country", null: false
    t.string "timezone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "consultancies", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "address"
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["discarded_at"], name: "index_consultancies_on_discarded_at"
  end

  create_table "device_timelines", force: :cascade do |t|
    t.text "index_system_display_message"
    t.text "index_system_display_title"
    t.bigint "device_id", null: false
    t.string "action_subject"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["device_id"], name: "index_device_timelines_on_device_id"
  end

  create_table "device_usages", force: :cascade do |t|
    t.boolean "approve"
    t.bigint "created_by_id"
    t.bigint "device_id", null: false
    t.bigint "assignee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignee_id"], name: "index_device_usages_on_assignee_id"
    t.index ["created_by_id"], name: "index_device_usages_on_created_by_id"
    t.index ["device_id"], name: "index_device_usages_on_device_id"
  end

  create_table "devices", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "company_id", null: false
    t.string "device_type", default: "laptop"
    t.string "name"
    t.string "serial_number"
    t.jsonb "specifications"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "assignee_id"
    t.boolean "available"
    t.string "version"
    t.string "version_id"
    t.string "brand"
    t.string "manufacturer"
    t.string "base_os"
    t.text "meta_details"
    t.index ["assignee_id"], name: "index_devices_on_assignee_id"
    t.index ["company_id"], name: "index_devices_on_company_id"
    t.index ["user_id"], name: "index_devices_on_user_id"
  end

  create_table "employments", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.string "employee_id"
    t.string "designation"
    t.string "employment_type"
    t.date "joined_at"
    t.date "resigned_at"
    t.index ["company_id"], name: "index_employments_on_company_id"
    t.index ["discarded_at"], name: "index_employments_on_discarded_at"
    t.index ["user_id"], name: "index_employments_on_user_id"
  end

  create_table "engagement_timestamps", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "engage_code"
    t.bigint "engage_updated_by_id"
    t.datetime "engage_updated_at"
    t.integer "week_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["engage_updated_by_id"], name: "index_engagement_timestamps_on_engage_updated_by_id"
    t.index ["user_id"], name: "index_engagement_timestamps_on_user_id"
  end

  create_table "identities", force: :cascade do |t|
    t.string "provider"
    t.string "uid"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "industry_codes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "sender_id", null: false
    t.string "recipient_email", null: false
    t.string "token", null: false
    t.datetime "accepted_at"
    t.datetime "expired_at"
    t.string "first_name"
    t.string "last_name"
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "department_id"
    t.boolean "team_lead"
    t.index ["company_id"], name: "index_invitations_on_company_id"
    t.index ["sender_id"], name: "index_invitations_on_sender_id"
    t.index ["token"], name: "index_invitations_on_token", unique: true
  end

  create_table "invoice_line_items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.date "date"
    t.decimal "rate", precision: 20, scale: 2, default: "0.0"
    t.integer "quantity", default: 1
    t.bigint "invoice_id", null: false
    t.bigint "timesheet_entry_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invoice_id"], name: "index_invoice_line_items_on_invoice_id"
    t.index ["timesheet_entry_id"], name: "index_invoice_line_items_on_timesheet_entry_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.date "issue_date"
    t.date "due_date"
    t.string "invoice_number"
    t.text "reference"
    t.decimal "amount", precision: 20, scale: 2, default: "0.0"
    t.decimal "outstanding_amount", precision: 20, scale: 2, default: "0.0"
    t.decimal "tax", precision: 20, scale: 2, default: "0.0"
    t.decimal "amount_paid", precision: 20, scale: 2, default: "0.0"
    t.decimal "amount_due", precision: 20, scale: 2, default: "0.0"
    t.decimal "discount", precision: 20, scale: 2, default: "0.0"
    t.integer "status", default: 0, null: false
    t.bigint "client_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "external_view_key"
    t.jsonb "payment_infos", default: {}
    t.bigint "company_id"
    t.index ["client_id"], name: "index_invoices_on_client_id"
    t.index ["company_id"], name: "index_invoices_on_company_id"
    t.index ["external_view_key"], name: "index_invoices_on_external_view_key", unique: true
    t.index ["invoice_number"], name: "index_invoices_on_invoice_number", unique: true
    t.index ["issue_date"], name: "index_invoices_on_issue_date"
    t.index ["status"], name: "index_invoices_on_status"
  end

  create_table "lead_line_items", force: :cascade do |t|
    t.bigint "lead_id", null: false
    t.string "name"
    t.integer "kind"
    t.text "description"
    t.integer "number_of_resource"
    t.integer "resource_expertise_level"
    t.float "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_lead_line_items_on_discarded_at"
    t.index ["lead_id"], name: "index_lead_line_items_on_lead_id"
  end

  create_table "lead_line_items_quotes", id: false, force: :cascade do |t|
    t.bigint "lead_quote_id", null: false
    t.bigint "lead_line_item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lead_line_item_id"], name: "index_lead_line_items_quotes_on_lead_line_item_id"
    t.index ["lead_quote_id"], name: "index_lead_line_items_quotes_on_lead_quote_id"
  end

  create_table "lead_quotes", force: :cascade do |t|
    t.bigint "lead_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "discarded_at"
    t.string "status"
    t.text "status_comment"
    t.index ["discarded_at"], name: "index_lead_quotes_on_discarded_at"
    t.index ["lead_id"], name: "index_lead_quotes_on_lead_id"
  end

  create_table "lead_tech_stacks", force: :cascade do |t|
    t.bigint "lead_id"
    t.bigint "tech_stack_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lead_id"], name: "index_lead_tech_stacks_on_lead_id"
    t.index ["tech_stack_id"], name: "index_lead_tech_stacks_on_tech_stack_id"
  end

  create_table "lead_timelines", force: :cascade do |t|
    t.bigint "lead_id", null: false
    t.integer "kind"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.text "index_system_display_message"
    t.bigint "parent_lead_timeline_id"
    t.bigint "action_assignee_id"
    t.bigint "action_reporter_id"
    t.bigint "action_created_by_id"
    t.datetime "action_due_at"
    t.string "action_subject"
    t.text "action_description"
    t.integer "action_priority_code", limit: 2
    t.text "index_system_display_title"
    t.string "action_email"
    t.string "action_phone_number"
    t.integer "action_schedule_status_code"
    t.string "action_social_type"
    t.string "action_social_id"
    t.integer "meta_action"
    t.text "meta_previous_changes"
    t.index ["action_assignee_id"], name: "index_lead_timelines_on_action_assignee_id"
    t.index ["action_created_by_id"], name: "index_lead_timelines_on_action_created_by_id"
    t.index ["action_reporter_id"], name: "index_lead_timelines_on_action_reporter_id"
    t.index ["discarded_at"], name: "index_lead_timelines_on_discarded_at"
    t.index ["lead_id"], name: "index_lead_timelines_on_lead_id"
    t.index ["parent_lead_timeline_id"], name: "index_lead_timelines_on_parent_lead_timeline_id"
  end

  create_table "leads", force: :cascade do |t|
    t.string "email"
    t.text "address"
    t.string "mobilephone"
    t.string "telephone"
    t.string "skypeid"
    t.string "linkedinid"
    t.string "timezone"
    t.string "country"
    t.string "description"
    t.boolean "donotbulkemail", default: false
    t.boolean "donotemail", default: false
    t.boolean "donotfax", default: false
    t.boolean "donotphone", default: false
    t.integer "quality_code"
    t.integer "stage_code"
    t.integer "industry_code_id"
    t.datetime "discarded_at"
    t.string "base_currency", default: "USD"
    t.decimal "budget_amount", default: "0.0"
    t.integer "status_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "assignee_id"
    t.bigint "reporter_id"
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.integer "preferred_contact_method_code"
    t.string "first_name"
    t.string "last_name"
    t.integer "source_code"
    t.text "emails", default: [], array: true
    t.integer "priority_code"
    t.string "title"
    t.bigint "company_id"
    t.text "websites", default: [], array: true
    t.string "job_position"
    t.index ["assignee_id"], name: "index_leads_on_assignee_id"
    t.index ["company_id"], name: "index_leads_on_company_id"
    t.index ["created_by_id"], name: "index_leads_on_created_by_id"
    t.index ["discarded_at"], name: "index_leads_on_discarded_at"
    t.index ["reporter_id"], name: "index_leads_on_reporter_id"
    t.index ["updated_by_id"], name: "index_leads_on_updated_by_id"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "invoice_id", null: false
    t.date "transaction_date", null: false
    t.text "note"
    t.decimal "amount", precision: 20, scale: 2, default: "0.0"
    t.integer "status", null: false
    t.integer "transaction_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invoice_id"], name: "index_payments_on_invoice_id"
  end

  create_table "payments_providers", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "connected", default: false
    t.boolean "enabled", default: false
    t.string "accepted_payment_methods", default: [], array: true
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_payments_providers_on_company_id"
    t.index ["name", "company_id"], name: "index_payments_providers_on_name_and_company_id", unique: true
  end

  create_table "previous_employments", force: :cascade do |t|
    t.string "company_name"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_previous_employments_on_user_id"
  end

  create_table "project_members", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "project_id", null: false
    t.decimal "hourly_rate", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_project_members_on_discarded_at"
    t.index ["project_id"], name: "index_project_members_on_project_id"
    t.index ["user_id"], name: "index_project_members_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.string "name", null: false
    t.text "description"
    t.boolean "billable", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.index ["client_id"], name: "index_projects_on_client_id"
    t.index ["discarded_at"], name: "index_projects_on_discarded_at"
  end

  create_table "quote_line_items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "comment"
    t.bigint "estimated_hours"
    t.bigint "lead_line_item_id"
    t.bigint "lead_quote_id", null: false
    t.integer "number_of_resource"
    t.integer "resource_expertise_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lead_line_item_id"], name: "index_quote_line_items_on_lead_line_item_id"
    t.index ["lead_quote_id"], name: "index_quote_line_items_on_lead_quote_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "space_usages", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "user_id", null: false
    t.integer "space_code"
    t.integer "purpose_code"
    t.float "start_duration"
    t.float "end_duration"
    t.date "work_date"
    t.text "note"
    t.boolean "restricted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "team_members", default: [], array: true
    t.integer "department_id"
    t.index ["company_id"], name: "index_space_usages_on_company_id"
    t.index ["user_id"], name: "index_space_usages_on_user_id"
  end

  create_table "stripe_connected_accounts", force: :cascade do |t|
    t.string "account_id", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_stripe_connected_accounts_on_account_id", unique: true
    t.index ["company_id"], name: "index_stripe_connected_accounts_on_company_id", unique: true
  end

  create_table "team_members", id: false, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "member_user_id", null: false
    t.index ["member_user_id", "user_id"], name: "index_team_members_on_member_user_id_and_user_id"
    t.index ["user_id", "member_user_id"], name: "index_team_members_on_user_id_and_member_user_id"
  end

  create_table "tech_stacks", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "timesheet_entries", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "project_id", null: false
    t.float "duration", null: false
    t.text "note", default: ""
    t.date "work_date", null: false
    t.integer "bill_status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_timesheet_entries_on_project_id"
    t.index ["user_id"], name: "index_timesheet_entries_on_user_id"
    t.index ["work_date"], name: "index_timesheet_entries_on_work_date"
  end

  create_table "user_members", force: :cascade do |t|
    t.bigint "member_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_user_members_on_member_id"
    t.index ["user_id"], name: "index_user_members_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "current_workspace_id"
    t.datetime "discarded_at"
    t.integer "department_id"
    t.string "personal_email_id"
    t.date "date_of_birth"
    t.jsonb "social_accounts"
    t.string "phone"
    t.integer "engage_code"
    t.bigint "engage_updated_by_id"
    t.datetime "engage_updated_at"
    t.boolean "team_lead", default: false
    t.text "xteam_member_ids", default: [], array: true
    t.string "color"
    t.string "slack_member_id"
    t.text "slack_member_info"
    t.integer "engage_week_code"
    t.datetime "engage_expires_at"
    t.string "token", limit: 50
    t.index ["current_workspace_id"], name: "index_users_on_current_workspace_id"
    t.index ["discarded_at"], name: "index_users_on_discarded_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["engage_updated_by_id"], name: "index_users_on_engage_updated_by_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["slack_member_id"], name: "index_users_on_slack_member_id", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  create_table "wise_accounts", force: :cascade do |t|
    t.string "profile_id"
    t.string "recipient_id"
    t.string "source_currency"
    t.string "target_currency"
    t.bigint "user_id", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_wise_accounts_on_company_id"
    t.index ["user_id", "company_id"], name: "index_wise_accounts_on_user_id_and_company_id", unique: true
    t.index ["user_id"], name: "index_wise_accounts_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "clients", "companies"
  add_foreign_key "device_timelines", "devices"
  add_foreign_key "device_usages", "devices"
  add_foreign_key "device_usages", "users", column: "assignee_id"
  add_foreign_key "device_usages", "users", column: "created_by_id"
  add_foreign_key "devices", "companies"
  add_foreign_key "devices", "users"
  add_foreign_key "devices", "users", column: "assignee_id"
  add_foreign_key "employments", "companies"
  add_foreign_key "employments", "users"
  add_foreign_key "engagement_timestamps", "users"
  add_foreign_key "engagement_timestamps", "users", column: "engage_updated_by_id"
  add_foreign_key "identities", "users"
  add_foreign_key "invitations", "companies"
  add_foreign_key "invitations", "users", column: "sender_id"
  add_foreign_key "invoice_line_items", "invoices"
  add_foreign_key "invoice_line_items", "timesheet_entries"
  add_foreign_key "invoices", "clients"
  add_foreign_key "invoices", "companies"
  add_foreign_key "lead_line_items", "leads"
  add_foreign_key "lead_quotes", "leads"
  add_foreign_key "lead_timelines", "lead_timelines", column: "parent_lead_timeline_id"
  add_foreign_key "lead_timelines", "leads"
  add_foreign_key "lead_timelines", "users", column: "action_assignee_id"
  add_foreign_key "lead_timelines", "users", column: "action_created_by_id"
  add_foreign_key "lead_timelines", "users", column: "action_reporter_id"
  add_foreign_key "leads", "companies"
  add_foreign_key "leads", "users", column: "assignee_id"
  add_foreign_key "leads", "users", column: "created_by_id"
  add_foreign_key "leads", "users", column: "reporter_id"
  add_foreign_key "leads", "users", column: "updated_by_id"
  add_foreign_key "payments", "invoices"
  add_foreign_key "payments_providers", "companies"
  add_foreign_key "previous_employments", "users"
  add_foreign_key "project_members", "projects"
  add_foreign_key "project_members", "users"
  add_foreign_key "projects", "clients"
  add_foreign_key "quote_line_items", "lead_quotes"
  add_foreign_key "space_usages", "companies"
  add_foreign_key "space_usages", "users"
  add_foreign_key "stripe_connected_accounts", "companies"
  add_foreign_key "timesheet_entries", "projects"
  add_foreign_key "timesheet_entries", "users"
  add_foreign_key "user_members", "users", column: "member_id"
  add_foreign_key "users", "companies", column: "current_workspace_id"
  add_foreign_key "users", "users", column: "engage_updated_by_id"
  add_foreign_key "wise_accounts", "companies"
  add_foreign_key "wise_accounts", "users"
end
