require 'cycr'

class SymbolController < ApplicationController
  def show
    client = Cyc::Client.new
    @symbol = params[:name]
    @all_genls = client.all_genls @symbol.to_sym
    @comment = client.comment @symbol.to_sym
    if @comment == nil
      @comment = "no comment"
    end
    if @all_genls == nil
      @all_genls = []
    end
  end

  def show_denotation
    client = Cyc::Client.new
    @symbol = (client.denotation_mapper params[:name])[0]
    @all_genls = client.all_genls @symbol
    @comment = client.comment @symbol
    if @comment == nil
      @comment = "no comment"
    end
    if @all_genls == nil
      @all_genls = []
    end
  end

  def complete
    client = Cyc::Client.new
    completes = client.constant_complete params[:query]

    if completes
      completes_map = completes.collect { |complete|
        {:name => complete}
      }
    else
      completes_map = []
    end

    render :json => {:success => true,
                     :data => completes_map
    }
  end
end
