# frozen_string_literal: true

class Slack::DeviceUsageNotifyJob < ApplicationJob
  SLACK_TACKLE_WEBHOOK_URL = ENV.fetch("SLACK_TACKLE_WEBHOOK_URL", nil)

  queue_as :default

  def perform(action_name, device_id, usage_creator_id)
    action_name = action_name.to_sym
    return unless SLACK_TACKLE_WEBHOOK_URL

    @device = Device.find(device_id)
    @usage_creator = User.find_by(id: usage_creator_id)

    payload_msg = case action_name
                  when :demand
                    demand_created_payload_msg
                  when :demand_canceled
                    demand_canceled_payload_msg
                  when :demand_approved
                    demand_approved_payload_msg
                  when :in_use
                    availability_changed_payload_msg
                  else
                    nil
    end
    if payload_msg
      RestClient.post SLACK_TACKLE_WEBHOOK_URL, payload_msg.to_json, { content_type: :json, accept: :json }
    end
  end

  private

    def assignee_tag
      return unless @device.assignee

      @device.assignee.slack_member_id.present? ? "<@#{device.assignee.slack_member_id}>" : nil
    end

    def free?
      @device.available?
    end

    def demand_created_payload_msg
      if @usage_creator
        usage_creator_tag = "by #{@usage_creator.slack_member_id.present? ? "<@#{@usage_creator.slack_member_id}>" : @usage_creator.full_name}"
      end

      {
        text: [":large_green_circle:", "#{@device.name} requested", usage_creator_tag].compact.join(" "),
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: [":large_green_circle:", assignee_tag, "#{@device.name} requested",
                     usage_creator_tag].compact.join(" "),
              emoji: true
            }
          }
        ].compact
      }
    end

    def demand_canceled_payload_msg
      if @usage_creator
        usage_creator_tag = "by #{@usage_creator.slack_member_id.present? ? "<@#{@usage_creator.slack_member_id}>" : @usage_creator.full_name}"
      end

      {
        text: [":red_circle:", "#{@device.name} request canceled", usage_creator_tag].compact.join(" "),
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: [":red_circle:", assignee_tag, "#{@device.name} request canceled",
                     usage_creator_tag].compact.join(" "),
              emoji: true
            }
          }
        ].compact
      }
    end

    def demand_approved_payload_msg
      {
        text: [":large_green_circle:", "#{@device.name} assigned"].compact.join(" "),
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: [":large_green_circle:", "#{@device.name} assigned", assignee_tag].compact.join(" "),
              emoji: true
            }
          }
        ].compact
      }
    end

    def availability_changed_payload_msg
      {
        text: [":large_green_circle:", "#{@device.name} #{free? ? 'is free now' : 'in use'}"].compact.join(" "),
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: [":large_green_circle:", "#{@device.name} #{free? ? 'is free now' : 'in use'}"].compact.join(" "),
              emoji: true
            }
          }
        ].compact
      }
    end
end
