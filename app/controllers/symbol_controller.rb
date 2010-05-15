require 'cycr'

class SymbolController < ApplicationController
  def show
    cyc = Cyc::Client.new
    @all_genls = cyc.comment params[:name].to_sym
  end
end
