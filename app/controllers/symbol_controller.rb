require 'cycr'

class SymbolController < ApplicationController
  def show
    client = Cyc::Client.new
    @symbol = params[:name]
    @all_genls = client.all_genls @symbol.to_sym
    @max_specs = client.max_specs @symbol.to_sym
    @comment = client.comment @symbol.to_sym
    if @comment == nil
      @comment = "no comment"
    end
    if @all_genls == nil
      @all_genls = []
    end
    if @max_specs == nil
      @max_specs = []
    end
  end

  def show_denotation
    client = Cyc::Client.new
    @name = params[:name]
    denotaion = client.denotation_mapper params[:name]
    if denotaion != nil
      @symbol = (client.denotation_mapper params[:name])[0]
      @all_genls = client.all_genls @symbol
      @max_specs = client.max_specs @symbol
      @comment = client.comment @symbol
    end
    if @comment == nil
      @comment = "no comment"
    end
    if @all_genls == nil
      @all_genls = []
    end
    if @max_specs == nil
      @max_specs = []
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
