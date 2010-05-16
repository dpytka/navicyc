require 'cycr'

class SymbolController < ApplicationController
  def show
    cyc = Cyc::Client.new
    commnet = cyc.comment params[:name].to_sym
    render :json => {:name => params[:name],
                     :comment => commnet
    }
  end
end
