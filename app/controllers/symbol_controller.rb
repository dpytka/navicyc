require 'cycr'

class SymbolController < ApplicationController
  def show
    client = Cyc::Client.new
    @comment = client.comment params[:name].to_sym
    @symbol = params[:name]
  end

  def complete
    client = Cyc::Client.new
    completes = client.constant_complete params[:query]
    completes_map = completes.collect {|x| {:name => x}}

    render :json => {:success => true,
                     :data => completes_map
    }
  end
end
