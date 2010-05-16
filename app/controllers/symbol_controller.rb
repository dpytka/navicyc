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
    render :json => {:success => true,
                     :data => [
                             {:name => 'Dog'},
                             {:name => 'Cat'},
                             {:name => 'Animal'}
                     ]
    }
  end
end
