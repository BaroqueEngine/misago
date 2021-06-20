require "digest"

Encoding.default_external = 'utf-8'

data = []
Dir.glob("../_posts/*.md") do |url|
  text = File.read(url)
  text.scan(/num: (\d+)/) do |s|
    data << $1.to_i
  end
end

data.sort!

puts data

