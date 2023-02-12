class ApplicationController < ActionController::API
    before_action :snake_case_params

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
end
