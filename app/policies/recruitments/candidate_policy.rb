# frozen_string_literal: true

class Recruitments::CandidatePolicy < ApplicationPolicy
  attr_reader :error_message_key

  def index?
    true
  end

  def items?
    allowed_users?
  end

  def show?
    allowed_users?
  end

  def create?
    allowed_users?
  end

  def new_invoice_line_items?
    allowed_users?
  end

  def update?
    allowed_users?
  end

  def destroy?
    allowed_users?
  end

  def allowed_users?
    user_owner_role? || user_admin_role? || (user_employee_role? && user_under_hr_department?)
  end

  def permitted_attributes
    [
      :name,
      :title,
      :first_name,
      :last_name,
      :email,
      :address,
      :country,
      :description,
      :cover_letter,
      :discarded_at,
      :linkedinid,
      :skypeid,
      :mobilephone,
      :telephone,
      :status_code,
      :assignee_id,
      :reporter_id,
      :created_by_id,
      :updated_by_id,
      :preferred_contact_method_code,
      :initial_communication,
      :source_code,
      :company_id,
      :consultancy_id,
      tech_stack_ids: [],
      emails: []
    ]
  end
end
