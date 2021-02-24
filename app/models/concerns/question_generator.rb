require 'net/http'
require 'openssl'
require 'json'

class QuestionGenerator < ApplicationRecord

  def self.generate_questions
    url = URI("https://opentdb.com/api.php?amount=50")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Post.new(url)
    request["content-type"] = 'application/x-www-form-urlencoded'


    response = http.request(request)
    result = JSON.parse(response.read_body)
  end


end