require 'cycr'

class SymbolController < ApplicationController
  def show
    cyc = Cyc::Client.new
    commnet = cyc.comment params[:name].to_sym
    if commnet
      render :json => {:success => true,
                       :data => {
                               :name => params[:name],
                               :comment => commnet
                       }
      }
    else
      render :json => {:success => false,
                       :message => 'Not found'}
    end

  end

  def complete
    cyc = Cyc::Client.new
    completes = cyc.constant_complete params[:query]
    completes_map = completes.collect {|x| {:name => x}}

    render :json => {:success => true,
                     :data => completes_map
    }
  end
end
