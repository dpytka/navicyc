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
      render :json => {:success => false}
    end

  end

  def complete
    cyc = Cyc::Client.new
    commnet = cyc.comment params[:name].to_sym
    render :json => {:name => params[:name],
                     :comment => commnet
    }
  end
end
