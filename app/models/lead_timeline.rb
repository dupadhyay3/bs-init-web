# frozen_string_literal: true

# == Schema Information
#
# Table name: lead_timelines
#
#  id                           :bigint           not null, primary key
#  action_description           :text
#  action_due_at                :datetime
#  action_email                 :string
#  action_phone_number          :string
#  action_priority_code         :integer
#  action_schedule_status_code  :integer
#  action_social_type           :string
#  action_subject               :string
#  comment                      :text
#  discarded_at                 :datetime
#  index_system_display_message :text
#  index_system_display_title   :text
#  kind                         :integer
#  meta_action                  :integer
#  meta_previous_changes        :text
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  action_assignee_id           :bigint
#  action_created_by_id         :bigint
#  action_reporter_id           :bigint
#  action_social_id             :string
#  lead_id                      :bigint           not null
#  parent_lead_timeline_id      :bigint
#
# Indexes
#
#  index_lead_timelines_on_action_assignee_id       (action_assignee_id)
#  index_lead_timelines_on_action_created_by_id     (action_created_by_id)
#  index_lead_timelines_on_action_reporter_id       (action_reporter_id)
#  index_lead_timelines_on_discarded_at             (discarded_at)
#  index_lead_timelines_on_lead_id                  (lead_id)
#  index_lead_timelines_on_parent_lead_timeline_id  (parent_lead_timeline_id)
#
# Foreign Keys
#
#  fk_rails_...  (action_assignee_id => users.id)
#  fk_rails_...  (action_created_by_id => users.id)
#  fk_rails_...  (action_reporter_id => users.id)
#  fk_rails_...  (lead_id => leads.id)
#  fk_rails_...  (parent_lead_timeline_id => lead_timelines.id)
#
class LeadTimeline < ApplicationRecord
  include Discard::Model
  belongs_to :lead
  belongs_to :action_assignee, class_name: :User, optional: true
  belongs_to :action_created_by, class_name: :User, optional: true
  belongs_to :action_reporter, class_name: :User, optional: true

  CodeOptionKlass = Struct.new(:name, :id, :key)

  KIND_OPTIONS = [
    CodeOptionKlass.new("System Message", 0),
    CodeOptionKlass.new("Comment", 1),
    CodeOptionKlass.new("Appointment", 2),
    CodeOptionKlass.new("Email", 3),
    CodeOptionKlass.new("Phone Call", 4),
    CodeOptionKlass.new("Skype DM", 5),
    CodeOptionKlass.new("LinkedIn DM", 6),
    CodeOptionKlass.new("Other DM", 7),
    CodeOptionKlass.new("Task", 8),
  ]

  META_ACTION_OPTIONS = [
    CodeOptionKlass.new("Other", 0, :other),
    CodeOptionKlass.new("Create", 1, :create),
    CodeOptionKlass.new("Update", 2, :update),
    CodeOptionKlass.new("Destroy", 3, :destroy),
  ]

  SCHEDULE_ACTION_STATUS_OPTIONS = [
    CodeOptionKlass.new("Initial", 0),
    CodeOptionKlass.new("Follow Up", 1),
    CodeOptionKlass.new("Schedule", 2),
    CodeOptionKlass.new("Re-Schedule", 3),
    CodeOptionKlass.new("In Progress", 4),
    CodeOptionKlass.new("Done", 5),
  ]

  PRIORITY_CODE_OPTIONS = [
    CodeOptionKlass.new("Lowest", 0),
    CodeOptionKlass.new("Low", 1),
    CodeOptionKlass.new("Normal", 2),
    CodeOptionKlass.new("High", 3),
    CodeOptionKlass.new("Highest", 4),
  ]

  before_create :set_index_system_display_message_and_title, if: -> { self.kind != 0 }

  scope :with_actions, ->(lead_ids, user) {
                              where(lead_id: lead_ids)
                                .where("action_assignee_id = ?", user.id)
                                .where.not(kind: [0, nil]).order(action_due_at: :asc)
                            }

  def self.filter(params: {}, user: User.none)
    if params[:date_range].present?
      leadtimeline_ids = []
      leadtimeline_ids = LeadTimeline.where("DATE(action_due_at) = ?", Date.today).pluck(:id) if params[:date_range] == "today"
      leadtimeline_ids = LeadTimeline.where("DATE(action_due_at) = ?", Date.today + 1).pluck(:id) if params[:date_range] == "tomorrow"
      leadtimeline_ids = LeadTimeline.where("action_due_at BETWEEN ? AND ? ", Time.now.beginning_of_month, Time.now.end_of_month).pluck(:id) if params[:date_range] == "this_month"
      leadtimeline_ids = LeadTimeline.where("action_due_at BETWEEN ? AND ? ", 1.month.ago.beginning_of_month, 1.month.ago.end_of_month).pluck(:id) if params[:date_range] == "last_month"
      leadtimeline_ids = LeadTimeline.where("action_due_at BETWEEN ? AND ? ", Time.now.beginning_of_week, Time.now.end_of_week).pluck(:id) if params[:date_range] == "this_week"
      leadtimeline_ids = LeadTimeline.where("action_due_at BETWEEN ? AND ? ", (Time.now - 7.days).beginning_of_week, (Time.now - 7.days).end_of_week).pluck(:id) if params[:date_range] == "last_week"
      leadtimeline_ids = LeadTimeline.where("action_due_at BETWEEN ? AND ? ", params[:from], params[:to]).pluck(:id) if params[:date_range] == "custom"
      LeadTimeline.with_actions(Lead.filter(params:, user:, ids: true), user).where(id: leadtimeline_ids)
    else
      LeadTimeline.with_actions(Lead.filter(params:, user:, ids: true), user)
    end
  end

  def created_at_formated
    self.created_at.strftime("#{self.created_at.day.ordinalize} %b %Y at %H:%M")
  end

  def action_due_at_formated
    self.action_due_at ? self.action_due_at.strftime("#{self.action_due_at.day.ordinalize} %b %Y at %H:%M") : ""
  end

  def kind_name_hash
    LeadTimeline::KIND_OPTIONS.group_by(&:id).transform_values { |val| val.first.name }
  end

  def action_schedule_status_code_name_hash
    LeadTimeline::SCHEDULE_ACTION_STATUS_OPTIONS.group_by(&:id).transform_values { |val| val.first.name }
  end

  def action_priority_code_name_hash
    LeadTimeline::PRIORITY_CODE_OPTIONS.group_by(&:id).transform_values { |val| val.first.name }
  end

  def kind_name
    return "" if kind.nil?

    self.kind_name_hash[kind]
  end

  def action_schedule_status_code_name
    return "" if action_schedule_status_code.nil?

    self.action_schedule_status_code_name_hash[action_schedule_status_code]
  end

  def action_priority_code_name
    return "" if action_priority_code.nil?

    self.action_priority_code_name_hash[action_priority_code]
  end

  def render_properties
    {
      id: self.id,
      action_description: self.action_description ? self.action_description.gsub(
        /\n/,
        "<br/>") : self.action_description,
      action_due_at: self.action_due_at,
      action_priority_code: self.action_priority_code,
      action_subject: self.action_subject,
      comment: self.comment,
      discarded_at: self.discarded_at,
      index_system_display_message: self.index_system_display_message,
      index_system_display_title: self.index_system_display_title,
      kind: self.kind,
      action_assignee: self.action_assignee ? self.action_assignee.attributes.merge(
        {
          full_name: self.action_assignee.full_name,
          avatar_url: self.action_assignee.avatar_url
        }) : { full_name: "", avatar_url: "" },
      action_created_by: self.action_created_by ? self.action_created_by.attributes.merge(
        {
          full_name: self.action_created_by.full_name,
          avatar_url: self.action_created_by.avatar_url
        }) : { full_name: "", avatar_url: "" },
      action_reporter: self.action_reporter ? self.action_reporter.attributes.merge(
        {
          full_name: self.action_reporter.full_name,
          avatar_url: self.action_reporter.avatar_url
        }) : { full_name: "", avatar_url: "" },
      lead: self.lead ? { id: self.lead.id, name: self.lead.name } : { id: "", name: "" },
      parent_lead_timeline_id: self.parent_lead_timeline_id,
      created_at: self.created_at,
      created_at_formated: self.created_at_formated,
      action_due_at_formated: self.action_due_at_formated,
      action_email: self.action_email,
      action_phone_number: self.action_phone_number,
      action_schedule_status_code: self.action_schedule_status_code,
      action_schedule_status_code_name: self.action_schedule_status_code_name,
      kind_name: self.kind_name,
      action_priority_code_name: self.action_priority_code_name
    }
  end

  private

    def set_index_system_display_message_and_title
      if self.kind == 1
        self.index_system_display_title = "<b>#{self.action_created_by&.full_name}</b> added an comment"
        self.index_system_display_message = "<p style='font-size: 0.875rem;line-height: 1.25rem;'>#{self.comment.gsub(/\n/, '<br/>')}</p>"
      elsif self.kind == 2
        self.index_system_display_title = "<b>#{self.action_created_by&.full_name}</b> schedule an appointment on <b>#{self.action_due_at_formated}</b>"
        self.index_system_display_message = "<p style='font-size: 0.875rem;line-height: 1.25rem;'>#{self.action_description.gsub(/\n/, '<br/>')}</p>"
      elsif self.kind == 3
        self.index_system_display_title = "<b>#{self.action_created_by&.full_name}</b> connect with email <b>#{self.action_email}</b> on <b>#{self.action_due_at_formated}</b>"
        self.index_system_display_message = "<p style='font-size: 0.875rem;line-height: 1.25rem;'>#{self.action_description.gsub(/\n/, '<br/>')}</p>"
      elsif self.kind == 4
        self.index_system_display_title = "<b>#{self.action_created_by&.full_name}</b> connect with phone number <b>#{self.action_phone_number}</b> on <b>#{self.action_due_at_formated}</b>"
        self.index_system_display_message = "<p style='font-size: 0.875rem;line-height: 1.25rem;'>#{self.action_description.gsub(/\n/, '<br/>')}</p>"
      elsif [5, 6, 7].include?(self.kind)
        self.index_system_display_title = "<b>#{self.action_created_by&.full_name}</b> connect with #{self.action_social_type} <b>#{self.action_social_id}</b> on <b>#{self.action_due_at_formated}</b>"
        self.index_system_display_message = "<p style='font-size: 0.875rem;line-height: 1.25rem;'>#{self.action_description.gsub(/\n/, '<br/>')}</p>"
      elsif self.kind == 8
        self.index_system_display_title = "<b>#{self.action_created_by&.full_name}</b> schedule a task on <b>#{self.action_due_at_formated}</b>"
        self.index_system_display_message = "<p style='font-size: 0.875rem;line-height: 1.25rem;'>#{self.action_description.gsub(/\n/, '<br/>')}</p>"
      end
    end
end
