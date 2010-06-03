module SymbolHelper
  def format_comment(comment)
    comment.gsub(/#\$[\w|-]+/) { |symbol| "<a href=\"#\">#{symbol[2..-1]}</a>" }
  end

  def format_all_genls(generalize_list)
    return_string = ''
    generalize_list.each do |generalize|
      return_string += "<a href=\"#\">#{generalize}</a> "
    end
    return_string
  end
end
