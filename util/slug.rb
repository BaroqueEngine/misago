require "digest"

Encoding.default_external = 'utf-8'

salt = ARGV[0]
n = ARGV[1]

if Digest::SHA512.hexdigest(salt).slice(0, 8) != "a2ef2853" then
  puts "Input Error"
  exit
end

puts Digest::SHA512.hexdigest(salt + n).slice(0, 8)
