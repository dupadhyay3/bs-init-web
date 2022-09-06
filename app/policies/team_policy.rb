# frozen_string_literal: true

class TeamPolicy < ApplicationPolicy
  def index?
    can_access?
  end

  def edit?
    can_access?
  end

  def update?
    can_access?
  end

  def destroy?
    can_access?
  end

  def can_access?
    user_owner_role? || user_admin_role? || (user_employee_role? && user_under_hr_department?)
  end

  def permitted_attributes
    [:first_name, :last_name, :email, :department_id, :avatar, :team_lead]
  end
end
