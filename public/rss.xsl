<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:content="http://purl.org/rss/1.0/modules/content/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/name"/> RSS Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">
          @font-face {
            font-family: "0xProtoMono";
            src: url("/fonts/0xProtoNerdFontMono-Regular.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            font-family: "0xProtoMono", "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace;
            font-size: 14px;
            line-height: 1.6;
            color: #cdd6f4;
            background-color: #1e1e2e;
            margin: 0;
            padding: 2rem 1rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          
          a {
            color: #b4befe;
            text-decoration: none;
          }
                    
          .info-banner {
            background-color: #313244;
            border: 1px solid #45475a;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 2rem;
            font-size: 0.9rem;
          }
          
          .info-banner strong {
            color: #b4befe;
            font-weight: 600;
          }
          
          .info-banner a {
            color: #89dceb;
          }
          
          header {
            padding: 2rem 0;
            border-bottom: 1px solid #cdd6f4;
            margin-bottom: 2rem;
          }
          
          .title-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 0.5rem;
          }
          
          header h1 {
            font-size: 1.75rem;
            color: #b4befe;
            margin: 0;
            font-weight: 700;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            position: relative;
            padding-bottom: 0.5rem;
          }
          
          header h1 span {
            position: relative;
          }
                    
          header h2 {
            font-size: 1.25rem;
            color: #cdd6f4;
            margin: 0.75rem 0 0.75rem 0;
            font-weight: 400;
          }
          
          header p {
            color: #a6adc8;
            margin: 0 0 1rem 0;
            font-size: 0.95rem;
          }
          
          .feed-link, .feed-link:hover {
            display: inline-block;
            padding: 0.5rem 1rem;
            background-color: #b4befe;
            border: 1px solid #b4befe;
            border-radius: 0.5rem;
            color: #181825;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.2s ease;
            cursor: pointer;
            text-decoration: none;
          }
          
          .feed-link:active {
            transform: scale(0.98);
          }
          
          h2 {
            font-size: 1.5rem;
            color: #b4befe;
            margin: 0 0 1.5rem 0;
            font-weight: 600;
          }

          .items {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          
          .item {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
            margin-bottom: 0;
          }
          
          .item-header {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .item h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
            line-height: 1.2;
          }
          
          .item h3 a, item h3 a:hover {
            color: #cdd6f4;
            transition: color 0.2s ease;
          }
                    
          .item-meta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #7f849c;
            font-size: 0.875rem;
            margin: 0;
            text-transform: capitalize;
          }
          
          .item-meta time {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .item-meta .separator {
            color: #7f849c;
          }
          
          .item-meta .icon {
            font-family: "0xProtoMono", monospace;
            font-size: 0.875rem;
            display: inline-block;
          }
          
          .item-meta > span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .item-meta a {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: inherit;
          }
          
          .item-meta a:hover {
            color: #b4befe;
          }
          
          .item-description {
            color: #f5e0dc;
            line-height: 1.6;
            margin: 0;
          }
          
          .item-description p {
            margin: 0.5rem 0;
          }
          
          .item-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0;
          }
          
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.625rem;
            font-size: 0.8125rem;
            font-weight: 500;
            border-radius: 0.25rem;
            transition: all 0.2s ease;
            line-height: 1.2;
          }
          
          .badge-soft {
            background-color: rgba(180, 190, 254, 0.1);
            color: #b4befe;
          }
          
          .badge-primary {
            background-color: rgba(180, 190, 254, 0.1);
            color: #b4befe;
          }
          
          .badge-accent {
            background-color: rgba(245, 224, 220, 0.1);
            color: #f5e0dc;
          }
          
          .badge a {
            color: inherit;
          }
                    
          .item-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
          }
          
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 0.75rem;
            font-size: 0.875rem;
            font-weight: 500;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
            cursor: pointer;
            text-decoration: none;
            border: 1px solid;
          }
          
          .btn-sm {
            padding: 0.25rem 0.625rem;
            font-size: 0.75rem;
            line-height: 1.2;
          }
          
          .btn .icon {
            font-family: "0xProtoMono", monospace;
            font-size: 0.8125rem;
            display: inline-block;
          }
          
          .btn-outline, .btn-outline:hover {
            background-color: transparent;
            border-color: #cdd6f4;
            color: #cdd6f4;
          }

          .btn-outline:active {
            transform: scale(0.98);
            border: none;
          }
                    
          .rss-icon {
            width: 1.2em;
            height: 1.2em;
            vertical-align: middle;
          }

          a, a:hover {
            text-decoration: none
          }
        </style>
      </head>
      <body>
        <div class="info-banner">
          <p>
            This is an <strong>RSS feed</strong>. <strong>Subscribe</strong> by copying the URL from the address bar into your newsreader.
          </p>
          <p style="margin-top: 0.5rem;">
            Visit <a href="https://aboutfeeds.com" target="_blank">About Feeds</a> to get started with newsreaders and subscribing. It's free.
          </p>
        </div>
        
        <header>
          <div class="title-wrapper">
            <h1>
              <span># <xsl:value-of select="/rss/channel/name"/> RSS Feed</span>
              <span>----------------------</span>
            </h1>
          </div>
          <h2><xsl:value-of select="/rss/channel/title"/></h2>
          <p><xsl:value-of select="/rss/channel/description"/></p>
          <a class="feed-link" target="_blank">
            <xsl:attribute name="href">
              <xsl:value-of select="/rss/channel/link"/>
            </xsl:attribute>
            Visit Website
          </a>
        </header>
        
        <div class="items">
          <xsl:for-each select="/rss/channel/item">
            <article class="item">
              <div class="item-header">
                <h3>
                  <a target="_blank">
                    <xsl:attribute name="href">
                      <xsl:value-of select="link"/>
                    </xsl:attribute>
                    ## <xsl:value-of select="title"/>
                  </a>
                </h3>
                <div class="item-meta">
                  <xsl:if test="pubDate">
                    <time>
                      <span class="icon">&#xf00ed;</span>
                      <xsl:value-of select="pubDate"/>
                    </time>
                  </xsl:if>
                  <xsl:if test="category">
                    <span class="separator">|</span>
                    <span>
                      <span class="icon">&#xf02d;</span>
                      <xsl:value-of select="category"/>
                    </span>
                  </xsl:if>
                  <xsl:if test="author">
                    <span class="separator">|</span>
                    <span>
                      <span class="icon">&#xf007;</span>
                      <xsl:value-of select="author"/>
                    </span>
                  </xsl:if>
                  <xsl:if test="repo">
                    <span class="separator">|</span>
                    <a class="repo-link" target="_blank" rel="noopener noreferrer">
                      <xsl:attribute name="href">
                        <xsl:text>https://github.com/</xsl:text>
                        <xsl:value-of select="repo"/>
                      </xsl:attribute>
                      <span class="icon">&#xf09b;</span>
                      <xsl:value-of select="repo"/>
                    </a>
                  </xsl:if>
                </div>
              </div>
              <xsl:if test="description">
                <p class="item-description">
                  <xsl:value-of select="description" disable-output-escaping="yes"/>
                </p>
              </xsl:if>
              <xsl:if test="series/name or tags/tag">
                <div class="item-tags">
                  <xsl:if test="series/name">
                    <a class="badge badge-soft badge-accent" target="_blank">
                      <xsl:attribute name="href">
                        <xsl:value-of select="series/link"/>
                      </xsl:attribute>
                      <span class="icon">&#xf02d;</span>
                      <xsl:value-of select="series/name"/>
                    </a>
                  </xsl:if>
                  <xsl:for-each select="tags/tag">
                    <a class="badge badge-soft badge-primary" target="_blank">
                      <xsl:attribute name="href">
                        <xsl:value-of select="link"/>
                      </xsl:attribute>
                      <xsl:value-of select="name"/>
                    </a>
                  </xsl:for-each>
                </div>
              </xsl:if>
              <div class="item-actions">
                <a class="btn btn-outline btn-sm" target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  Read More <span class="icon">&#xf013e;</span>
                </a>
              </div>
            </article>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>