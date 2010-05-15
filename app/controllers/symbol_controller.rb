require 'cycr'

class SymbolController < ApplicationController
  def show 
    cyc = Cyc::Client.new
    @all_genls = cyc.comment :Dog
  end
end
