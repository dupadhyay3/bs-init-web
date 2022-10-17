# frozen_string_literal: true

class TeamPolicy < ApplicationPolicy
  def index?
    can_access? || user_employee_role? # user_team_lead?
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
    user_owner_role? || user_admin_role?
  end

  def permitted_attributes
    [:first_name, :last_name, :email, :department_id, :avatar, :team_lead]
  end
end
