module SymbolHelper
  def format_comment(comment)
    comment.gsub(/#\$[\w|-]+/) { |symbol| "<a href=\"#\">#{symbol[2..-1]}</a>" }
  end

  def format_all_genls(all_genls)
    return_string = ''
    for genls in all_genls
      return_string += "<a href=\"#\">#{genls}</a> "
    end
    return_string
  end
end
