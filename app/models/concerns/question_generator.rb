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

  def self.save_questions
    counter = 1
    while counter < 30
      question_array = QuestionGenerator.generate_questions['results']
      question_array.each do |qst|
      hash = {
        category: qst['category'],
        difficulty: qst['difficulty'],
        question: qst['question'],
        correct_answer: qst['correct_answer'],
        incorrect_answer_1: qst['incorrect_answers'][0],
        incorrect_answer_2: qst['incorrect_answers'][1],
        incorrect_answer_3: qst['incorrect_answers'][2]
      }
        Trivium.create(hash)
      end
      counter +=1
    end
  end

end